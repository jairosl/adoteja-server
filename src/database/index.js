import knex from 'knex';
import knexfile from '../../knexfile';

const connection = knex(knexfile.development);

export default connection;
