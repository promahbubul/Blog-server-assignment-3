import mongoose from 'mongoose';
import app from './app';
import config from './app/config/config';
import colors from 'colors';

async function server() {
  try {
    // Database Connection
    const response = await mongoose.connect(config.database_uri as string);
    console.log(
      `${colors.bgBlue(
        'Database:',
      )} MongoDB connected successfully. ${colors.blue(
        response.connection.host,
      )}`,
    );

    // Listen Server Port
    app.listen(config.port, () => {
      console.log(
        colors.bgGreen('Server:'),
        'Running on: ',
        colors.green(`http://localhost:${config.port}`),
      );
    });
  } catch (error) {
    console.log(error);
  }
}

server();
