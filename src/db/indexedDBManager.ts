class IndexedDBManager {
    private static instance: IndexedDBManager;
    private dbConnections: Map<string, IDBDatabase> = new Map();
  
    private constructor() {}
  
    static getInstance(): IndexedDBManager {
      if (!IndexedDBManager.instance) {
        IndexedDBManager.instance = new IndexedDBManager();
      }
      return IndexedDBManager.instance;
    }
  
    async getConnection(dbName: string, version: number = 1): Promise<IDBDatabase> {
      if (this.dbConnections.has(dbName)) {
        return this.dbConnections.get(dbName)!;
      }
  
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);
  
        request.onerror = () => reject(request.error);
  
        request.onsuccess = () => {
          const db = request.result;
          this.dbConnections.set(dbName, db);
          resolve(db);
        };
  
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
        };
      });
    }
  
    closeConnection(dbName: string) {
      const db = this.dbConnections.get(dbName);
      if (db) {
        db.close();
        this.dbConnections.delete(dbName);
      }
    }
  
    closeAllConnections() {
      this.dbConnections.forEach((db, dbName) => {
        db.close();
      });
      this.dbConnections.clear();
    }
  }
  
  export const dbManager = IndexedDBManager.getInstance();