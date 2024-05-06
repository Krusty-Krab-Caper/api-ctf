import { FastifyInstance } from 'fastify'

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

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 10px;
    }

    strong {
        color: #ff4500;
    }

    .secret-sauce {
        font-weight: bold;
        color: #008000;
    }

    .recipe {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin: 20px auto;
        max-width: 600px;
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
        <h1>The Krabby Patty Secret Recipe:</h1>
        <div class="recipe">
        <ul>
            <li>1 cup of freshly ground seahorse meat</li>
            <li>1/2 cup of chopped jellyfish tentacles</li>
            <li>1/4 cup of minced kelp</li>
            <li>1 tablespoon of Neptune's trident flakes</li>
            <li>1 teaspoon of powdered coral</li>
            <li>A pinch of sea salt</li>
            <li>A dash of seaweed seasoning</li>
            <li>1 secret ingredient: <strong class="secret-sauce">pickles</strong></li>
        </ul>
        <p>Combine all the ingredients in a bowl and mix well. Shape the mixture into patties and grill them to perfection.</p>
        </div>
    </body>
</html>
`

export function registerVault(server: FastifyInstance) {
  server.get('/vault', async (request, reply) => {
    reply.header('Content-Type', 'text/html').send(html)
  })
}
