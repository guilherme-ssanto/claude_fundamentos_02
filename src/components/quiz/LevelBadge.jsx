import { Badge } from '@/components/ui/Badge'

const levelMap = {
  iniciante: { label: 'Iniciante', color: '#3B82F6' },
  intermediário: { label: 'Intermediário', color: '#F59E0B' },
  avançado: { label: 'Avançado', color: '#8B5CF6' },
}

export function LevelBadge({ level }) {
  const config = levelMap[level] ?? { label: level, color: '#6B6B6B' }
  return <Badge label={config.label} color={config.color} />
}
