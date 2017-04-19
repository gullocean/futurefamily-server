import { version } from '../../package.json';
import { Router } from 'express';
import bodyParser from 'body-parser';
import delay from 'express-delay';

import facets from './facets';

export default ({ config, db }) => {
  let api = Router();
  let token = "e30.C7Gp_A.pEappEKkeYDHsdVh2aXc6xhIimU";

  // Delay all responses for 1 second
  api.use(delay(5000));

  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true }));

  // mount the facets resource
  api.use('/facets', facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  api.get('/v1/auth', (req, res) => {
    res.json({ auth: token });
  });

  // woman : https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png
  // man: https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819__180.png

  api.post('/v1/login/email', (req, res) => {
    res.json({
      name    : 'test name',
      bday    : '29th March 1975',
      email   : 'test@gmail.com',
      address : '786 Lodgeville Road, Minneapolis, Minnesota, 55401',
      phone   : '612-277-5911',
      avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png'
    })
  });

  api.post('/v1/logout/email', (req, res) => {
    res.json({
      code: 200
    })
  });

  api.post('/v1/signup/email', (req, res) => {
    let result = true;
    console.log(req.body);
    console.log(req.headers);

    res.json({
      success: result
    })
  });

  api.post('/v1/confirm/email', (req, res) => {
    let result = true;
    console.log(req.body);
    console.log(req.headers);

    res.json({
      success: result
    })
  });

  api.put('/v1/users', (req, res) => {
    let result = true;
    console.log(req.body);
    console.log(req.headers);

    res.json({
      name    : 'test name',
      bday    : '29th March 1975',
      email   : 'test@gmail.com',
      address : '786 Lodgeville Road, Minneapolis, Minnesota, 55401',
      phone   : '612-277-5911',
      avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png'
    })
  });

  api.get('/v1/messages/latest', (req, res) => {
    res.json([
        {
          isAdmin : false,
          name    : 'Alice Carey',
          tag     : 'Nurse',
          time    : '15:45',
          content : 'Nulla vitae elit libero, a pharetra augue Nulla vitae elit libero…',
          avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png'
        }, {
          isAdmin : true,
          name    : 'Admin',
          tag     : 'Missed Payment',
          time    : '15:45',
          content : 'Nulla vitae elit libero, a pharetra augue Nulla vitae elit libero…',
          avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819__180.png'
        }, {
          isAdmin : false,
          name    : 'Alice Carey',
          tag     : 'Nurse',
          time    : '15:45',
          content : 'Nulla vitae elit libero, a pharetra augue Nulla vitae elit libero…',
          avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png'
        }, {
          isAdmin : false,
          name    : 'Alice Carey',
          tag     : 'Nurse',
          time    : '15:45',
          content : 'Nulla vitae elit libero, a pharetra augue Nulla vitae elit libero…',
          avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819__180.png'
        }
      ]);
  });

  return api;
}
