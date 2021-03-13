const crypto = require('crypto');

//Izveidojam 32 baitu atslēgu, saņemam atpakaļ Bufferi un to pārveidojam uz hexadecimālu.
const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');
console.table({ key1, key2 });

//Key1 ir domāts AccessTokenam un Key2 ir domāts refresh tokenam.
