import { combineReducers } from 'redux';
import Book from './module/Book';
import Search from './module/Search';
import Post from './module/Post';
import User from './module/User';

export default combineReducers({
  Book,
  Search,
  Post,
  User,
});
