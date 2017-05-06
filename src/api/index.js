import { version } from '../../package.json';
import { Router } from 'express';
import bodyParser from 'body-parser';
import delay from 'express-delay';
import fs from 'fs';
import csv from 'fast-csv';

import facets from './facets';

export default ({ config, db }) => {
  let api = Router();
  let token = 'e30.C7Gp_A.pEappEKkeYDHsdVh2aXc6xhIimU';
  let buildingData = [];

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
      auth : 'eyJ1aWQiOjU3MzA4Mjc0NzY0MDIxNzZ9.C9kHKg.mfPKI-GZOywG2ZoBGst2DYGi6_0',
      code : 0, // 0: ok, 1: not verified 2: not exist
      user : {
        address : '786 Lodgeville Road, Minneapolis, Minnesota, 55401',
        avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png',
        bday    : '29th March 1975',
        comments: 'testing',
        created : 1492612456.5384953,
        emails  : [
          {
            email    : '1e54d582@opayq.com',
            verified : true
          }
        ],
        id      : 5730827476402176,
        modified: 1492612522.4364216,
        name    : 'Jeff Nelson',
        phone   : '+47 037 71 717',
        role    : 'standard',
        status  : 'new',
        subscribe: [
          'newsletter'
        ]
      }
    });
  });

  api.post('/v1/logout/email', (req, res) => {
    res.json({
      code: 200
    });
  });

  api.post('/v1/signup/email', (req, res) => {
    let result = true;
    console.log(req.body);
    console.log(req.headers);

    res.json({
      success: result
    });
  });

  api.post('/v1/confirm/email', (req, res) => {
    let result = true;
    console.log(req.body);
    console.log(req.headers);

    res.json({
      auth : 'eyJ1aWQiOjU3MzA4Mjc0NzY0MDIxNzZ9.C9kHKg.mfPKI-GZOywG2ZoBGst2DYGi6_0',
      user : {
        address : '786 Lodgeville Road, Minneapolis, Minnesota, 55401',
        avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png',
        bday    : '29th March 1975',
        comments: 'testing',
        created : 1492612456.5384953,
        emails  : [
          {
            email    : '1e54d582@opayq.com',
            verified : true
          }
        ],
        id      : 5730827476402176,
        modified: 1492612522.4364216,
        name    : 'Jeff Nelson',
        phone   : '+47 037 71 717',
        role    : 'standard',
        status  : 'new',
        subscribe: [
          'newsletter'
        ]
      }
    });
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

  api.put('/v1/users', (req, res) => {
    let result = true;
    console.log(req.body);
    console.log(req.headers);

    res.json({
      name    : 'test name',
      bday    : '29th March 1975',
      email   : '1e54d582@opayq.com',
      address : '786 Lodgeville Road, Minneapolis, Minnesota, 55401',
      phone   : '612-277-5911',
      avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png'
    });
  });

  api.get('/v1/users', (req, res) => {
    let result = true;
    console.log(req.body);
    console.log(req.headers);
    console.log(req.query);

    res.json({
          user : {
            address : '786 Lodgeville Road, Minneapolis, Minnesota, 55401',
            avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png',
            bday    : '29th March 1975',
            comments: 'testing',
            created : 1492612456.5384953,
            emails  : [
              {
                email    : '1e54d582@opayq.com',
                verified : true
              }
            ],
            id      : 5730827476402176,
            modified: 1492612522.4364216,
            name    : 'Jeff Nelson',
            phone   : '+47 037 71 717',
            role    : 'standard',
            status  : 'new',
            subscribe: [
              'newsletter'
            ]
          }
        });
  });

  api.post('/v1/users/auth/google', (req, res) => {
    let result = true;
    console.log(req.body);
    console.log(req.headers);
    console.log(req.query);

    res.json({
          user : {
            address : '786 Lodgeville Road, Minneapolis, Minnesota, 55401',
            avatar  : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png',
            bday    : '29th March 1975',
            comments: 'testing',
            created : 1492612456.5384953,
            emails  : [
              {
                email    : '1e54d582@opayq.com',
                verified : true
              }
            ],
            id      : 5730827476402176,
            modified: 1492612522.4364216,
            name    : 'Jeff Nelson',
            phone   : '+47 037 71 717',
            role    : 'standard',
            status  : 'new',
            subscribe: [
              'newsletter'
            ]
          }
        });
  });

  api.get('/get-building-data', (req, res) => {
    res.json({ buildingData });
  });

  let stream = fs.createReadStream('./src/models/PNC_Buildings.csv');

  csv
   .fromStream(stream, {headers : true})
   .on('data', function(data){
      data['Region']            = +data['Region'];
      data['Latitude']          = +data['Latitude'];
      data['Longitude']         = +data['Longitude'];
      data['Seating Capacity']  = +(data['Seating Capacity'].replace(/\$|,/g, ''));

      buildingData.push(data);
   })
   .on('end', function(){
       // console.log('done');
       // console.log(buildingData);
   });

  return api;
}
