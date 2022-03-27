import express from 'express';
import env from './env';
import bodyParser from 'body-parser';
import { node, initNode } from './node';
// import employeeManager from "./employee";
import db, {EmployeeEvents, LndNode} from './employee-db';
import nodeManager from "./node-manager";
import cors from 'cors';

// Configure server
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));



// Routes
app.get('/info', async (req, res, next) => {
  try {
    const info = await node.getInfo();
    const { balance } = await node.channelBalance();
    res.send({info, balance});
    next();
  } catch(err) {
    next(err);
  }
});

app.get('/api/employees', (req, res) => {
  res.json({ data: db.getEmployees() });
});

app.get('/api/employees/:id', (req, res) => {
  const employee = db.getEmployee(parseInt(req.params.id, 10));
  if (employee) {
    res.json({ data: employee });
  } else {
    res.status(404).json({ error: `No Employee found with ID ${req.params.id}`});
  }
});

app.post('/api/employees', async (req, res, next) => {
  try {
    const { name, payInSatoshi, paymentScheduleRate, publicKey } = req.body;

    if (!name || !paymentScheduleRate) {
      throw new Error('Fields name, payInSatoshi and paymentScheduleRate are required to make a employee');
    }

    const employee = db.createEmployee(name, payInSatoshi, paymentScheduleRate, publicKey);
    // const invoice = await node.addInvoice({
    //   memo: `LitBit Employees #${employee.id}`,
    //   value: payInSatoshi,
    //   expiry: '120', // 2 minutes
    // });

    res.json({
      data: {
        employee
      },
    });
  } catch(err) {
    next(err);
  }
});

app.post('/api/node/:employeeId', async (req, res, next) => {
  try {
    const employeeDetail = db.getEmployee(parseInt(req.params.employeeId, 10));
    if (employeeDetail) {
      const { host, cert, macaroon } = req.body;

      if (!host || !cert || !macaroon) {
        throw new Error('Fields host, cert and macaroon are required to make a employee');
      }
      let nodeByPubkey = db.getNodeByPubkey(employeeDetail.publicKey);
      if(!nodeByPubkey){
        const { token, publicKey } = await nodeManager.connect(host, cert, macaroon);
        const lndNode = <LndNode> {
          token: token,
          host: host,
          cert: cert,
          macaroon: macaroon,
          pubkey: publicKey
        }
        db.updateEmployeePublickKey(employeeDetail.id, publicKey)
        db.addNode(lndNode)

        res.json({
          data: {
            lndNode
          },
        });
      }

    } else {
      res.status(404).json({ error: `No Employee found with ID ${req.params.id}`});
    }

  } catch(err) {
    // next(err);
    res.status(500).json({ error: err.stack});
  }
});

app.get('/api/nodes', (req, res) => {
  res.json({ data: db.getAllNodes() });
});

app.get('/api/employees/:employeeId/invoice', async (req, res, next) => {
  try{
    const { employeeId } = req.params;

    // find the Employee
    const employee = db.getEmployee(parseInt(employeeId));
    if (!employee) throw new Error('Employee not found');
      if (employee) {

        // find the node that made this Employee
        const node = db.getNodeByPubkey(employee.publicKey);
        if (!node) throw new Error('Node not found for this Employee');

        // create an invoice on the Employee's node
        const rpc = nodeManager.getRpc(node.token);
        const amount = 10;
        const inv = await rpc.addInvoice({ value: amount.toString() });
        res.send({
          payreq: inv.paymentRequest,
          hash: (inv.rHash as Buffer).toString('base64'),
          amount,
        });
      } else {
        res.status(404).json({ error: `No Employee found with ID ${req.params.id}`});
      }
  } catch(err) {
    next(err);
  }
});

app.post("/api/employees/:employeeId/pay-invoice", async function (req, res, next) {
  try{
    const { employeeId } = req.params;
    const { payment_request } = req.body;

    // validate that a invoice paymentHash was provided
    if (!payment_request) throw new Error('payment_request is required');
    // find the Employee
    const employee = db.getEmployee(parseInt(employeeId));
    if (!employee) throw new Error('Employee not found');
    // find the node that made this Employee
    const node = db.getNodeByPubkey(employee.publicKey);
    if (!node) throw new Error('Node not found for this Employee');

    const rpc = nodeManager.getRpc(node.token);
    await rpc.sendPayment(payment_request);
    res.send(employee);
  } catch(err) {
    next(err);
  }

});


app.post("/api/employees/:employeeId/check-invoice", async function (req, res, next) {
  try{
    const { employeeId } = req.params;
    const { hash } = req.body;

    // validate that a invoice hash was provided
    if (!hash) throw new Error('hash is required');
    // find the Employee
    const employee = db.getEmployee(parseInt(employeeId));
    if (!employee) throw new Error('Employee not found');
    // find the node that made this Employee
    const node = db.getNodeByPubkey(employee.publicKey);
    if (!node) throw new Error('Node not found for this Employee');

    const rpc = nodeManager.getRpc(node.token);
    const rHash = Buffer.from(hash, 'base64');
    const { settled } = await rpc.lookupInvoice({ rHash });
    if (!settled) {
      throw new Error('The payment has not been paid yet!');
    }

    // db.upvotePost(employee.id);
    res.send(employee);
  } catch(err) {
    next(err);
  }

});



// Initialize node & server
console.log('Initializing Lightning node...');
initNode().then(() => {
  console.log('Lightning node initialized!');
  console.log('Starting server...');
  db.createEmployee("zIlesanmi", 200, "Hourly", "hgkjhgkj");
  db.createEmployee("aIlesanmi", 200, "Hourly", "hgkjhgkjewr");
  db.createEmployee("bOmoniyi", 400, "monthly", "hgkwerwqjhgkj");
  app.listen(env.PORT, () => {
    console.log(`Server started at http://localhost:${env.PORT}!`);
  });
});