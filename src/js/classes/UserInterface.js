export class UserInterface {
  static appContent = document.getElementById('app-view');

  static render(element, ...data) {
    UserInterface.appContent.innerHTML += element.render(...data);
  }

  static clear() {
    UserInterface.appContent.innerHTML = '';
  }
}
