function assignRoleFromEmail(email) {
  if (!email) return 'USER';
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return domain === 'company.com' ? 'ADMIN' : 'USER';
}

module.exports = { assignRoleFromEmail };