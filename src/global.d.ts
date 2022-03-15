declare global {
  namespace Response {
    interface Success {
      type: 'success';
      html: string;
      lastbatch: boolean;
      currentday: string;
      postflair: {
        [key: string]: number;
      };
    }
    interface Empty {
      type: 'empty';
      lastbatch: boolean;
    }
  }

  interface Mission {
    source: string;
    name: string;
  }
  interface Queue extends Array<Mission> {}
}

export {};
