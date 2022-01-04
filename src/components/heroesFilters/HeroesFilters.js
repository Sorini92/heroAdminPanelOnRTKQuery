import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { useGetFiltersQuery } from '../../api/filtersApiSlice';

import {activeFilterChanged} from '../heroesFilters/filtersSlice'
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const {
        data: filters = [],
        isLoading,
        isError
    } = useGetFiltersQuery();


    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;