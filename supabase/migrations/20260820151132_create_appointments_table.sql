/*
  # Criação da tabela de agendamentos da Barbearia Lopes

  1. Nova tabela
    - `appointments`
      - `id` (uuid, chave primária)
      - `client_name` (texto, nome de quem agendou)
      - `client_phone` (texto, telefone de contato)
      - `appointment_date` (data do corte)
      - `appointment_time` (horário do corte)
      - `status` (texto: 'confirmado', 'concluido' ou 'cancelado')
      - `created_at` (data/hora de criação do registro)

  2. Regras de negócio
    - Um índice único garante que não existam dois agendamentos "confirmado"
      para a mesma data e horário (evita choque de horários).
    - Índice comum na data para acelerar as buscas do painel do barbeiro.

  3. Segurança (RLS)
    - RLS habilitado na tabela `appointments`.
    - Qualquer visitante (anon) pode CRIAR um agendamento (é assim que o
      cliente marca o corte sem precisar de login), mas só pode criar com
      status "confirmado" — não pode inserir como concluído/cancelado.
    - Apenas usuários autenticados (o barbeiro, que faz login) podem VER,
      ATUALIZAR (ex: marcar como concluído/cancelado) ou EXCLUIR agendamentos.
      Isso protege o nome e telefone dos clientes de serem vistos por
      qualquer visitante do site.

  4. Função auxiliar `get_booked_times`
    - Função com privilégios elevados (SECURITY DEFINER) que devolve apenas
      os horários já ocupados em uma data, sem expor nome/telefone de
      ninguém. É usada pelo site público para desabilitar horários já
      ocupados na tela de agendamento.
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_phone text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text NOT NULL DEFAULT 'confirmado' CHECK (status IN ('confirmado', 'concluido', 'cancelado')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS appointments_active_slot_unique
  ON appointments (appointment_date, appointment_time)
  WHERE status = 'confirmado';

CREATE INDEX IF NOT EXISTS appointments_date_idx ON appointments (appointment_date);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments" ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'confirmado');

DROP POLICY IF EXISTS "barber_select_appointments" ON appointments;
CREATE POLICY "barber_select_appointments" ON appointments FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "barber_update_appointments" ON appointments;
CREATE POLICY "barber_update_appointments" ON appointments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "barber_delete_appointments" ON appointments;
CREATE POLICY "barber_delete_appointments" ON appointments FOR DELETE
  TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION get_booked_times(p_date date)
RETURNS TABLE(appointment_time time)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT a.appointment_time FROM appointments a
  WHERE a.appointment_date = p_date AND a.status = 'confirmado';
$$;

REVOKE ALL ON FUNCTION get_booked_times(date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_booked_times(date) TO anon, authenticated;
