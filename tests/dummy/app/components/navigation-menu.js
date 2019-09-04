import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  classNames:['sidenav col-md-10'],
  navigationService: service()
});
