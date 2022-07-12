import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://bgardwyddngxbbgghqri.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXJkd3lkZG5neGJiZ2docXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc2MzgwMTUsImV4cCI6MTk3MzIxNDAxNX0.7_dLkUG2Wqi20kYl2se4wwZQhPq7OJPMXZ4M04Vs290'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}
