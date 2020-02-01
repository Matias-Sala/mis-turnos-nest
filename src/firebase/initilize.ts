import * as admin from 'firebase-admin';

export default admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'mis-turnos-607b1',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9eaPQI8/jO/zW\ngDWl7Lc18uvNeaJe+4djWzf7qId3oWC6sOogrtXOLw364LDS8XAlFcpvQln6NWWN\nAFwTS5RRifK+0NrnVWXsUnTXvynBdniKrqfrU/tq23eJMBn/4srxfnVp0OR+Wi1Q\nqumCDwTJ8qEZ0vFUTBRzM7vizSpSGaDU2Mwq56FWPxOjMDoHM3BKQcNE6tsJYRhh\nKGlL7dXEM3wM/DM7xbrELFAZZFcn8qYArxWaNgZMXQihoWbQqfJI55SAR0VlIOmY\ne/s5be/oJTKsGe4XrzMs7CKgi+DtF92AqAU9kc3MEups3T3DovTbQNNkmwGbTbXL\nmZF5PdtrAgMBAAECggEACpX4soDFtRbdZeiM1sPWapOzW+v/R9o6srDefFdqliL0\nggmvUvsho97aI5mZF3f4wYGpqTSmTUXdchbCjitrUnDoGIQXrtQFGUJ0F7es8Aub\n6XeflxS+l7ZCQ+5ljXfQydQ8YBiVI4ALRxX9bNBE/rlpCcXQyNplTBhoV2AKDMMc\nI9N2TNrmDE5i04p8aSI4unPUB4VQ+zFzD1ne1sgQfKM4LRd9ikgbeCaKuGXZbTDl\nAUY5YgYp/0FS/YQVUYr2f4OlYJOOj8mi0R7qq2r2ZaUDoPhGup0h9DghZ2Zopx2M\nKPcSmShRFZnMzLpejdRCNag9mUWeR/ti/sEJI7p/sQKBgQDpiQ1zvlHhkGLeZ32M\n/zY2m32dR8bVEjygGCAV8xb2yhCSiElnqnP2jbWtqX4CmzEpc6A1zOdEfhoKvcyR\nMsFvdN1ZdbLtpX8iRNogWyWW+HrpkyR4Tpmo1LndMCQdqop5RghsF1GgKBtRwtBN\nq92lYnTAntxhOck+5rx+ZIS/UQKBgQDPs5QaNgk5Kz53cwzWPR3Z4nc00lzLp3or\nh9uH2AZKbMkMGvkEbQW26RmMqYqKu4H0GMVGodDwwqsCubOQz1rJew+WO2u/GKg0\nIlMbwzcyH/vb9WmuxnjRQBqqbn7mxqVai25NctC/xazTz9QlUg81rbFP8txWXfmT\nlcAr4gYX+wKBgQCJ5Z2F3LmowYM/5Egke4ZdlE8GEh38LrqRpe08SMAklYhXnhYK\nGoJC8cZ3dv+rNkw/N8FAQ2/D59okwZILorbJw234pyEyZmi9qX5LYMa/cJXTWklM\nqMze/k2JqCWLRuphVdMfUF2ofkYzbx9k3bkRMSPToXpsBp0ogUKIN36TIQKBgBME\nvY383rFWbVzgsw82/3HBE+tJS+f2CPDNeuOge0r7VRl/qsel9/z8sTM5Hw9/BfJF\nBmNmU8yH9sLEIFYlNon2c8Hs5PvVlSlY70U+heJYHWbRvQCc+dknRonOnl4hWGjH\nFa2P0t+MiTvH7wQP1Ia0xeStN1HNPxotfzBFfQtbAoGBANMIdPlrsZhCGy8CCFHu\nfe+Pw5KJ8bY91P3suWecMwIW3dIapZddadTpWaweKzB3g79/XhNe1RHWwuGIWRS0\neZuL5Q32FjLSlfqfaPvzx1rSRa7WzKWGI4ERwjFLMbYd+OfhVj5ZOtPpGMIouc38\nkcRdas4IWqlMdU6AWu9KQZp4\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n'),
    clientEmail: 'firebase-adminsdk-f0q37@mis-turnos-607b1.iam.gserviceaccount.com',
  }),
});

declare global {
  namespace Express {
    interface Request {
      firebaseUser: admin.auth.DecodedIdToken;
    }
  }
}
