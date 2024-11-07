import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsowzmmmzdqandxseeta.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zb3d6bW1temRxYW5keHNlZXRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTYxNTQ4MiwiZXhwIjoyMDQ1MTkxNDgyfQ.suHuDvP-GsdWUdXYGwWK0rYbdSzIdYG1yeOpXDaQslI'


export const supabase = createClient(supabaseUrl, supabaseKey)
