import express from 'express';
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const app = express();
const port = 2121;

app.use(cors());

const __filename = fileURLToPath(import.meta.url);  // Get the file path of the current module
const __dirname = path.dirname(__filename);        

app.use(express.static(path.join(__dirname, '../frontend')));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or API key is missing.');
  process.exit(1); 
}

const supabase = createClient(supabaseUrl, supabaseKey);

  
app.get('/api/data', (req, res) => {
  try {
    const result = [
        {id: '123',
        name: 'omid',
        },
        {
            id: '5453',
            name: 'Peter',
        }
    ]; 
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});


  app.get('/', async (req, res) => {
     try {
       const {data, error} = await supabase.from('firstTable').select('*');
        if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
       res.json(data);
     } catch (error) {
         console.error('Server error:', error);  
       res.status(500).json({ message: error.message });
     }
   });


app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
