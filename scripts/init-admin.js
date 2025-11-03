// Script'as pirmojo admin vartotojo sukūrimui
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  // Patikriname ar admin jau egzistuoja
  const existingAdmin = await prisma.admin.findUnique({
    where: { username },
  });

  if (existingAdmin) {
    console.log('Admin vartotojas jau egzistuoja!');
    return;
  }

  // Hash'iname slaptažodį
  const hashedPassword = await bcrypt.hash(password, 10);

  // Sukuriame admin
  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log('Admin vartotojas sukurtas sėkmingai!');
  console.log('Vartotojo vardas:', admin.username);
  console.log('Slaptažodis:', password);
  console.log('\n⚠️  SVARBU: Pakeiskite slaptažodį pirmame prisijungime!');
}

createAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Klaida:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

