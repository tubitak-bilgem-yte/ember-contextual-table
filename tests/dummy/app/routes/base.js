import Route from '@ember/routing/route';
import data from '../data';

export default Route.extend({
  model(){
    return data.players.slice();
  },

  activate() {
    this._super();
    window.scrollTo(0, 0);
  }
});
