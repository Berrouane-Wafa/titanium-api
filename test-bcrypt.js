const bcrypt = require("bcrypt");

async function main(password,saltRounds) {
    const pswHash = await bcrypt.hash(password, saltRounds);
    console.log(pswHash);
    return pswHash;
}

const password = "hello123";
main(password,10)


async function compare(pswHash,password) {
   if (await bcrypt.compare(password,pswHash)) {
        console.log("le mot de passe correspond au hash");
        
   } else {
        console.log("le mot de passe ne correspond pas au hash");

   }
}
compare("$2b$10$dOqWCFSgq2roQz65IKgeo.FxJvovVI1cwrQaWv4MbhftZ23FK2K3Xt8O",password)