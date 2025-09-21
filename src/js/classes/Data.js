export class Data {
  static fetchData() {
    return new Promise(async (resolve, reject) => {
      try {
        const req = await fetch(
          'https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4328&s=2024-2025'
        );
        const res = await req.json();
        resolve(res);
      } catch {
        reject('There was a problem. Please try again later.');
      }
    });
  }
}
