import { assertFails, assertSucceeds, RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { collection, doc, Firestore, getDoc, setDoc } from "firebase/firestore";
import { dispatchLog, registerTest } from "../../utils";

const fakeCMSMainDoc = {
  name: "about",
  actualSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      content: { type: "string" },
    },
  },
  latestVersion: "2",
};

const fakeVersionDoc = {
  content: JSON.stringify({
    title: "About Page",
    description: "About page description",
    content: "About page content",
  }),
  createdAt: new Date().toISOString(),
  schema: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      content: { type: "string" },
    },
  },
};


export async function runTestsForCMS(firestore: Firestore, testEnv: RulesTestEnvironment) {
  dispatchLog("info", "Running tests for CMS collection");
  
  // Contexts
  const admin = testEnv.authenticatedContext("gsbenevides2", {
    email: "gsbenevides2@gmail.com",
  });
  const regularUser = testEnv.authenticatedContext("regularUser", {
    email: "regular@example.com",
  });
  const unauthenticated = testEnv.unauthenticatedContext();

  // Main CMS Collection
  const cmsCollectionAdmin = collection(admin.firestore(), "cms");
  const cmsCollectionRegular = collection(regularUser.firestore(), "cms");
  const cmsCollectionUnauth = collection(unauthenticated.firestore(), "cms");

  // Write tests for a document in the main CMS Collection
  await registerTest("CMS Main Doc - Unauthenticated user cannot write to CMS collection", 
    () => assertFails(setDoc(doc(cmsCollectionUnauth, "about"), fakeCMSMainDoc)));

  await registerTest("CMS Main Doc - Regular user cannot write to CMS collection", 
    () => assertFails(setDoc(doc(cmsCollectionRegular, "about"), fakeCMSMainDoc)));

  await registerTest("CMS Main Doc - Admin user can write to CMS collection", 
    () => assertSucceeds(setDoc(doc(cmsCollectionAdmin, "about"), fakeCMSMainDoc)));

  // Read tests for a document in the main CMS Collection
  await registerTest("CMS Main Doc - Unauthenticated user can read CMS document", 
    () => assertSucceeds(getDoc(doc(cmsCollectionUnauth, "about"))));

  await registerTest("CMS Main Doc - Regular user can read CMS document", 
    () => assertSucceeds(getDoc(doc(cmsCollectionRegular, "about"))));

  await registerTest("CMS Main Doc - Admin user can read CMS document", 
    () => assertSucceeds(getDoc(doc(cmsCollectionAdmin, "about"))));
    
  // Not Lastest Version CMS Document Write Tests
  await registerTest("CMS Not Latest Version Doc - Unauthenticated user cannot write to CMS version document", 
    () => assertFails(setDoc(doc(cmsCollectionUnauth, "about", "versions", "1"), fakeVersionDoc)));
  
  await registerTest("CMS Not Latest Version Doc - Regular user cannot write to CMS version document", 
    () => assertFails(setDoc(doc(cmsCollectionRegular, "about", "versions", "1"), fakeVersionDoc)));
  
  await registerTest("CMS Not Latest Version Doc - Admin user can write to CMS version document", 
    () => assertSucceeds(setDoc(doc(cmsCollectionAdmin, "about", "versions", "1"), fakeVersionDoc)));
  
  // Not Lastest Version CMS Document Read Tests
  await registerTest("CMS Not Latest Version Doc - Unauthenticated user cannot read CMS version document", 
    () => assertFails(getDoc(doc(cmsCollectionUnauth, "about", "versions", "1"))));

  await registerTest("CMS Not Latest Version Doc - Regular user cannot read CMS version document", 
    () => assertFails(getDoc(doc(cmsCollectionRegular, "about", "versions", "1"))));
  
  await registerTest("CMS Not Latest Version Doc - Admin user can read CMS version document", 
    () => assertSucceeds(getDoc(doc(cmsCollectionAdmin, "about", "versions", "1"))));

  
  // Latest Version CMS Document Write Tests
  await registerTest("CMS Latest Version Doc - Unauthenticated user cannot write to CMS version document", 
    () => assertFails(setDoc(doc(cmsCollectionUnauth, "about", "versions", "2"), fakeVersionDoc)));
  
  await registerTest("CMS Latest Version Doc - Regular user cannot write to CMS version document", 
    () => assertFails(setDoc(doc(cmsCollectionRegular, "about", "versions", "2"), fakeVersionDoc)));
  
  await registerTest("CMS Latest Version Doc - Admin user can write to CMS version document", 
    () => assertSucceeds(setDoc(doc(cmsCollectionAdmin, "about", "versions", "2"), fakeVersionDoc)));
  
  // Latest Version CMS Document Read Tests
  await registerTest("CMS Latest Version Doc - Unauthenticated user can read CMS version document", 
    () => assertSucceeds(getDoc(doc(cmsCollectionUnauth, "about", "versions", "2"))));
  
  await registerTest("CMS Latest Version Doc - Regular user can read CMS version document", 
    () => assertSucceeds(getDoc(doc(cmsCollectionRegular, "about", "versions", "2"))));
  
  await registerTest("CMS Latest Version Doc - Admin user can read CMS version document", 
    () => assertSucceeds(getDoc(doc(cmsCollectionAdmin, "about", "versions", "2"))));
  
  







  // await registerTest("CMS Main Doc - Unauthenticated user can read CMS document", 
  //   () => assertSucceeds(getDoc(doc(cmsCollectionUnauth, "about"))));

  // await registerTest("CMS Main Doc - Regular user can read CMS document", 
  //   () => assertSucceeds(getDoc(doc(cmsCollectionRegular, "about"))));

  // await registerTest("CMS Main Doc - Admin user can read CMS document", 
  //   () => assertSucceeds(getDoc(mainCMSDoc)));

  // await registerTest("CMS Main Doc - Regular user cannot update CMS document", 
  //   () => assertFails(updateDoc(doc(cmsCollectionRegular, "about"), { latestVersion: 3 })));

  // await registerTest("CMS Main Doc - Admin user can update CMS document", 
  //   () => assertSucceeds(updateDoc(mainCMSDoc, { latestVersion: 3 })));

  // // ==== TESTES PARA SUBCOLEÇÃO VERSIONS ====
  
  // const versionsCollectionAdmin = collection(mainCMSDoc, "versions");
  
  // // Setup: Create version documents
  // const version1Doc = doc(versionsCollectionAdmin, "1");
  // const version2Doc = doc(versionsCollectionAdmin, "2");
  // const version3Doc = doc(versionsCollectionAdmin, "3");
  
  // await setDoc(version1Doc, fakeVersionDoc);
  // await setDoc(version2Doc, fakeVersionDoc);
  // // version 3 não existe inicialmente, latestVersion é 2

  // // References for different user contexts
  // const version1Unauth = doc(cmsCollectionUnauth, "about", "versions", "1");
  // const version2Unauth = doc(cmsCollectionUnauth, "about", "versions", "2");
  // const version3Unauth = doc(cmsCollectionUnauth, "about", "versions", "3");
  
  // const version1Regular = doc(cmsCollectionRegular, "about", "versions", "1");
  // const version2Regular = doc(cmsCollectionRegular, "about", "versions", "2");
  // const version3Regular = doc(cmsCollectionRegular, "about", "versions", "3");

  // // Testes de leitura para usuários não autenticados
  // // Nota: usuários não autenticados não podem acessar versions devido à limitação do get() nas regras
  // await registerTest("CMS Versions - Unauthenticated user cannot read old version (v1, latest is v2)", 
  //   () => assertFails(getDoc(version1Unauth)));

  // await registerTest("CMS Versions - Unauthenticated user cannot read versions (security limitation)", 
  //   () => assertFails(getDoc(version2Unauth)));

  // // Testes de leitura para usuários regulares (não admin)
  // await registerTest("CMS Versions - Regular user cannot read old version (v1, latest is v2)", 
  //   () => assertFails(getDoc(version1Regular)));

  // await registerTest("CMS Versions - Regular user cannot read any version (admin only)", 
  //   () => assertFails(getDoc(version2Regular)));

  // // Testes de leitura para admin
  // await registerTest("CMS Versions - Admin can read old version (v1)", 
  //   () => assertSucceeds(getDoc(version1Doc)));

  // await registerTest("CMS Versions - Admin can read latest version (v2)", 
  //   () => assertSucceeds(getDoc(version2Doc)));

  // // Testes de escrita para usuários não autenticados
  // await registerTest("CMS Versions - Unauthenticated user cannot write new version", 
  //   () => assertFails(setDoc(version3Unauth, fakeVersionDoc)));

  // await registerTest("CMS Versions - Unauthenticated user cannot update existing version", 
  //   () => assertFails(updateDoc(version1Unauth, { updatedField: "new value" })));

  // // Testes de escrita para usuários regulares
  // await registerTest("CMS Versions - Regular user cannot write new version", 
  //   () => assertFails(setDoc(version3Regular, fakeVersionDoc)));

  // await registerTest("CMS Versions - Regular user cannot update existing version", 
  //   () => assertFails(updateDoc(version1Regular, { updatedField: "new value" })));

  // // Testes de escrita para admin
  // await registerTest("CMS Versions - Admin can write new version", 
  //   () => assertSucceeds(setDoc(version3Doc, fakeVersionDoc)));

  // await registerTest("CMS Versions - Admin can update existing version", 
  //   () => assertSucceeds(updateDoc(version1Doc, { updatedField: "admin update" })));

  // // Teste de mudança de versão mais recente
  // await updateDoc(mainCMSDoc, { latestVersion: 3 });

  // await registerTest("CMS Versions - After updating latestVersion to 3, regular user still cannot read v2 (admin only)", 
  //   () => assertFails(getDoc(version2Regular)));

  // await registerTest("CMS Versions - After updating latestVersion to 3, regular user still cannot read v3 (admin only)", 
  //   () => assertFails(getDoc(version3Regular)));

  // // Testes adicionais para verificar que usuários não autenticados não podem acessar versions de forma alguma
  // await registerTest("CMS Versions - Unauthenticated user cannot read v3 even when it's latest", 
  //   () => assertFails(getDoc(version3Unauth)));

  dispatchLog("success", "All tests for CMS collection passed");
}