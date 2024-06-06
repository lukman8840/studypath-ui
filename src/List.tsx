import { Button, Card } from './app.style';
import { MdDeleteSweep } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { Topics } from './common';

interface ListProps {
  data: Topics[];
  setEdit: (edit: boolean) => void;
  markAsDone: (id: number) => void;
  setCurrentTopic: (topic: Topics) => void;
  deleteTopic: (id: number) => void;
}

function List({
  data,
  setEdit,
  markAsDone,
  setCurrentTopic,
  deleteTopic,
}: ListProps) {
  return (
    <>
      {data.map((item) => {
        return (
          <>
            <Card>
              <div className='title'>
                <div className='checkbox-wrapper-56'>
                  <label className='container'>
                    <input
                      onChange={() => markAsDone(item.id)}
                      checked={item.isDone}
                      type='checkbox'
                    />
                    <div className='checkmark'></div>
                  </label>
                </div>
                <a target='_blank' href={item.link}>
                  {item.title}
                </a>
              </div>

              <div>
                <Button
                  onClick={() => {
                    setEdit(true);
                    setCurrentTopic(item);
                  }}
                >
                  <TbEdit size={20} />
                </Button>
                <Button type='submit' onClick={() => deleteTopic(item.id)}>
                  <MdDeleteSweep size={20} />
                </Button>
              </div>
            </Card>
          </>
        );
      })}
    </>
  );
}

export default List;
