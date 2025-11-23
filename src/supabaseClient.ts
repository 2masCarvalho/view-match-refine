import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://uszdiqdlwempkjqjlvaq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzemRpcWRsd2VtcGtqcWpsdmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTc4MDksImV4cCI6MjA3ODUzMzgwOX0.TT4TfWVVtwRQgPRCwjf1qvXSVsWBtbkdWuXhpmtHNTM"

export const supabase = createClient(supabaseUrl, supabaseKey)