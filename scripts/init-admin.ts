// Script'as pirmojo admin vartotojo sukūrimui
import prisma from '../lib/prisma';
import { hashPassword } from '../lib/auth';

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
  const hashedPassword = await hashPassword(password);

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
  });

