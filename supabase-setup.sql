-- Execute este script no SQL Editor do painel do Supabase
-- antes de rodar a aplicação pela primeira vez.

CREATE TABLE scores (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name   text NOT NULL,
  avatar_url  text,
  score       int NOT NULL CHECK (score >= 0 AND score <= 15),
  score_ini   int NOT NULL,
  score_int   int NOT NULL,
  score_adv   int NOT NULL,
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX idx_scores_score_desc ON scores (score DESC, created_at ASC);

ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert own score" ON scores
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "read all scores" ON scores
  FOR SELECT TO authenticated
  USING (true);

-- View retorna o melhor score por usuário
CREATE VIEW leaderboard AS
SELECT DISTINCT ON (user_id)
  user_id,
  user_name,
  avatar_url,
  score,
  score_ini,
  score_int,
  score_adv,
  created_at
FROM scores
ORDER BY user_id, score DESC, created_at ASC;

-- Após criar a tabela, ative o Realtime em:
-- Supabase Dashboard > Database > Replication > scores (toggle ON)
