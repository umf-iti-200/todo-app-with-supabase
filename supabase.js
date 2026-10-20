const {
    createServerClient, parseCookieHeader, serializeCookieHeader,
} = require("@supabase/ssr");

const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
   throw new Error('Missing Supabase environment variables');
}

const createClient = (context) => {
   return createServerClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
       cookies: {
           getAll() {
               return parseCookieHeader(context.req.headers.cookie ?? '')
           },
           setAll(cookiesToSet, headers) {
               cookiesToSet.forEach(({ name, value }) =>
                   context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value))
               )
               Object.entries(headers).forEach(([key, value]) => context.res.setHeader(key, value))
           },
       },
   })
}

module.exports = createClient;
