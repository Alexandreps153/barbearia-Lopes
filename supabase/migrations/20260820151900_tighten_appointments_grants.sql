/*
  # Restringe privilégios da tabela appointments para o papel anon

  1. Contexto
    - A tabela `appointments` já tem RLS habilitado e as políticas corretas:
      o visitante (anon) só pode INSERIR agendamentos com status "confirmado",
      e apenas o barbeiro autenticado pode ver, alterar e excluir.
    - No entanto, os privilégios concedidos diretamente na tabela davam ao
      papel anon também SELECT, UPDATE e DELETE. As políticas de RLS já
      bloqueiam essas operações para anon (não há política SELECT/UPDATE/
      DELETE para anon), mas por princípio do menor privilégio removemos
      esses privilégios desnecessários.

  2. Alterações
    - Revoga SELECT, UPDATE e DELETE do papel anon na tabela appointments.
    - Mantém INSERT para anon (necessário para o cliente agendar sem login).
    - Mantém todos os privilégios para authenticated (o barbeiro).
*/

REVOKE SELECT, UPDATE, DELETE ON appointments FROM anon;
GRANT INSERT ON appointments TO anon;
