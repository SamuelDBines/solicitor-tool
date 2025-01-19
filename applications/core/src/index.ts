import * as settings from './utils/settings';
import app from './app';

app.listen(settings.PORT, () => {
  console.log(`Server is running on http://localhost:${settings.PORT}`);
}); 
