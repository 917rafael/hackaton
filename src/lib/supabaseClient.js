import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsowzmmmzdqandxseeta.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zb3d6bW1temRxYW5keHNlZXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MTU0ODIsImV4cCI6MjA0NTE5MTQ4Mn0.soOy2yhqGh6NaXIy-jm-hqEjHl6H_maeGiqOcwYCoxo';
export const supabase = createClient(supabaseUrl, supabaseKey);
