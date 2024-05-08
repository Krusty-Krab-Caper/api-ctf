import { FastifyInstance } from 'fastify'
import { getSecrets } from './gameSecrets'

const css = `
<style>
    body {
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
    }

    h1 {
        color: #ff4500;
        text-align: center;
    }

    .login {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin: 20px auto;
        max-width: 600px;
    }

    .login form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .login input[type="password"] {
        margin-bottom: 10px;
    }

    .login input[type="submit"] {
        background-color: #ff4500;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
    }

    .login input[type="submit"]:hover {
        background-color: #ff6347;
    }

    .hint {
        text-align: center;
        color: #808080;
    }
</style>
`

const html = `
<!DOCTYPE html>
<html>
    <head>
        <title>The Krusty Krab Recipe Vault</title>
        ${css}
    </head>
    <body>
        <h1>The Krusty Krab Recipe Vault Login</h1>
        <div class="login">
            <form id="login-form">
                <label for="master-password">Master Password:</label><br>
                <input type="password" id="master-password" name="master-password"><br>
                <input type="submit" value="Submit">
            </form>
        </div>
        <div class="hint">
            <p>If you have forgotten the master password, please ask your system administrator.</p>
        </div>
        <script>
            document.getElementById('login-form').addEventListener('submit', function(event) {
                event.preventDefault();
                const password = document.getElementById('master-password').value;
                window.location.href = \`/vault/opensesame?password=\${encodeURIComponent(password)}\`;
            });
        </script>
    </body>
</html>
`

export function registerVault(server: FastifyInstance) {
  server.get('/vault', async (request, reply) => {
    const receivedToken = request.headers.authorization
    const requiredToken = 'Bearer ' + getSecrets().vaultAuthToken

    if (receivedToken !== requiredToken) {
      await reply.code(401).send('Unauthorized')
      return
    }

    reply.header('Content-Type', 'text/html').send(html)
  })
}
