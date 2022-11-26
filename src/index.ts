import * as dotenv from 'dotenv';
import server from './server';

dotenv.config();

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
