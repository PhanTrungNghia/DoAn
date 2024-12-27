// _helpers/useHistory.ts
import { useNavigate, useLocation, NavigateFunction, Location } from 'react-router-dom';

export const useHistory = () : HistoryType => {
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();
    
    return { navigate, location };
};