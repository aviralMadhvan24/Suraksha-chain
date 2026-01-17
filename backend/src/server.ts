import app from './app';
import { checkUpi } from './routes/checkUpi';

app.post('/check-upi', checkUpi);

app.listen(5000, () => {
  console.log('Suraksha backend running on port 5000');
});
