import { version } from '../../package.json';
import { Router } from 'express';
import bodyParser from 'body-parser';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();
  let token = "e30.C7Gp_A.pEappEKkeYDHsdVh2aXc6xhIimU";

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

  api.post('/v1/login/email', (req, res) => {
    console.log(req.body.email);
    console.log(req.headers.authorization);
    res.json({
      name: 'test name',
      bday: '29th March 1975',
      email: req.body.email,
      address: '786 Lodgeville Road, Minneapolis, Minnesota, 55401',
      phone: '612-277-5911',
      avatar: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__180.png'
    })
  });

	return api;
}
