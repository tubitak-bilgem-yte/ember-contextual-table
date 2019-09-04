import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  navigationService: service(),

  actions: {
    buttonClicked(target) {
      this.transitionToRoute(target);
    }
  }
});
