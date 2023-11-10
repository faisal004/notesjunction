import { Spinner } from '@/components/spinner';
import axios from 'axios';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Title from './title';
import { createClient } from '@supabase/supabase-js';
import { Banner } from './banner';
import { Menu } from './menu';

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)


const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  console.log(params.documentId);

  const fetchData = async () => {
    try {
      const req = await axios.get(`/api/getdocuments/${params.documentId}`);
      const newData = req.data;
      setData(newData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    fetchData()
    const subscription = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'Document',
      },
      (payload) => {
        fetchData()
      },
    )
    .subscribe()
    return () => {
      // Unsubscribe when the component is unmounted or when params.documentId changes
      subscription.unsubscribe();
    };

  }, [params.documentId]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (data === undefined) {
    return null;
  }

 console.log(data)
 console.log("sadsd")


  return (
    <>
    <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
      {isCollapsed && (
        <MenuIcon
          role="button"
          onClick={onResetWidth}
          className="h-6 w-6 text-muted-foreground"
        />
      )}
      <div className="flex items-center justify-between w-full">
        <Title initialData={data?.title} second={data?.icon}/>
        <div className="flex items-center gap-x-2">
            <Menu documentId={data?.id} />
          </div>
      </div>
    </nav>
    {data?.isArchived && (

      <Banner documentId={data.id}/>

      
    )}
    </>
  );
};

export default Navbar;
