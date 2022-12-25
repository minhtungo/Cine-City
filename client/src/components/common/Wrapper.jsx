import { useEffect } from 'react';
import {useDispatch} from 'react-redux';

const Wrapper = ({state,children}) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch()
    
      return () => {
        second
      }
    }, [third])
    

  return (
    <div>Wrapper</div>
  )
}
export default Wrapper