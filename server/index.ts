import express from 'express';
import env from './env';
import bodyParser from 'body-parser';
import { node, initNode } from './node';
import employeeManager from "./employee";

// Configure server
const app = express();
app.use(bodyParser.json());



// Routes
app.get('/', async (req, res, next) => {
  try {
    const info = await node.getInfo();
    res.send(`
      <h1>Node info</h1>
      <pre>${JSON.stringify(info, null, 2)}</pre>
    `);
    next();
  } catch(err) {
    next(err);
  }
});

app.get('/api/employees', (req, res) => {
  res.json({ data: employeeManager.getEmployees() });
});

app.get('/api/employees/:id', (req, res) => {
  const employee = employeeManager.getEmployee(parseInt(req.params.id, 10));
  if (employee) {
    res.json({ data: employee });
  } else {
    res.status(404).json({ error: `No Employee found with ID ${req.params.id}`});
  }
});

app.post('/api/employees', async (req, res, next) => {
  try {
    const { name, payInSatoshi, paymentScheduleRate } = req.body;

    if (!name || !paymentScheduleRate) {
      throw new Error('Fields name, payInSatoshi and paymentScheduleRate are required to make a employee');
    }

    const employee = employeeManager.addEmployee(name, payInSatoshi, paymentScheduleRate);
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


// Initialize node & server
console.log('Initializing Lightning node...');
initNode().then(() => {
  console.log('Lightning node initialized!');
  console.log('Starting server...');
  employeeManager.addEmployee("zIlesanmi", 200, "Hourly");
  employeeManager.addEmployee("aIlesanmi", 200, "Hourly");
  employeeManager.addEmployee("bOmoniyi", 400, "monthly");
  app.listen(env.PORT, () => {
    console.log(`Server started at http://localhost:${env.PORT}!`);
  });
});