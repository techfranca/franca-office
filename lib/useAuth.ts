// lib/useAuth.ts

import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { getUserByEmail, AuthorizedUser } from './users';
import { useStore } from './store';

export interface AuthState {
  firebaseUser: FirebaseUser | null;
  userProfile: AuthorizedUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthorized: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    firebaseUser: null,
    userProfile: null,
    isLoading: true,
    error: null,
    isAuthorized: false
  });
  
  const { setCurrentUser, logout: storeLogout } = useStore();

  // Listener de estado de autenticação
  useEffect(() => {
    if (!auth) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        // Verificar se está na whitelist
        const profile = getUserByEmail(firebaseUser.email);
        
        if (profile) {
          // Usuário autorizado
          setAuthState({
            firebaseUser,
            userProfile: profile,
            isLoading: false,
            error: null,
            isAuthorized: true
          });
          
          // Atualizar store do Zustand
          setCurrentUser({
            id: profile.id,
            name: profile.name,
            role: profile.role,
            avatar: profile.icon,
            photoURL: firebaseUser.photoURL || undefined,
            email: firebaseUser.email,
            currentRoom: null,
            status: 'available',
            lastSeen: new Date()
          });
        } else {
          // Email não autorizado - fazer logout
          if (auth) await firebaseSignOut(auth);
          setAuthState({
            firebaseUser: null,
            userProfile: null,
            isLoading: false,
            error: `O email ${firebaseUser.email} não está autorizado. Entre em contato com o administrador.`,
            isAuthorized: false
          });
          storeLogout();
        }
      } else {
        // Não logado
        setAuthState({
          firebaseUser: null,
          userProfile: null,
          isLoading: false,
          error: null,
          isAuthorized: false
        });
        storeLogout();
      }
    });

    return () => unsubscribe();
  }, [setCurrentUser, storeLogout]);

  // Função de login com Google
  const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    if (!auth || !googleProvider) {
      return { success: false, error: 'Firebase não inicializado' };
    }

    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      
      if (!email) {
        if (auth) await firebaseSignOut(auth);
        return { success: false, error: 'Não foi possível obter o email da conta' };
      }
      
      // Verificar whitelist
      const profile = getUserByEmail(email);
      
      if (!profile) {
        if (auth) await firebaseSignOut(auth);
        return { 
          success: false, 
          error: `O email ${email} não está autorizado a acessar o Franca Office.` 
        };
      }
      
      return { success: true };
      
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      // Tratar erros específicos do Firebase
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelado.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up bloqueado. Permita pop-ups para este site.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  };

  // Função de logout
  const signOut = async (): Promise<void> => {
    if (!auth) return;
    
    try {
      await firebaseSignOut(auth);
      storeLogout();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // Limpar erro
  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    signInWithGoogle,
    signOut,
    clearError
  };
}