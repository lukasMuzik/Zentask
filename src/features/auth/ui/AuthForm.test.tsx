import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ChakraProvider} from '@chakra-ui/react';
import {AuthForm} from './AuthForm';

// ============================================================================
// Mocks
// ============================================================================

const mockAuthenticate = jest.fn();

jest.mock('../hooks/useAuthentication', () => ({
  useAuthentication: jest.fn(),
}));

jest.mock('@tanstack/react-router', () => ({
  Link: ({children, to}: any) => <a href={to}>{children}</a>,
}));

jest.mock('@shared/assets/icons', () => ({
  ForwardIcon: () => <div data-testid="forward-icon" />,
  HideIcon: () => <div data-testid="hide-icon" />,
  ShowIcon: () => <div data-testid="show-icon" />,
  AddIcon: () => <div data-testid="add-icon" />,
  BackwardsIcon: () => <div data-testid="backwards-icon" />,
  CheckIcon: () => <div data-testid="check-icon" />,
  DeleteIcon: () => <div data-testid="delete-icon" />,
  EditIcon: () => <div data-testid="edit-icon" />,
  MoreIcon: () => <div data-testid="more-icon" />,
}));

function renderWithProviders(component: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false},
      mutations: {retry: false},
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{component}</ChakraProvider>
    </QueryClientProvider>
  );
}

describe('AuthForm', () => {
  beforeEach(() => {
    const {useAuthentication} = require('../hooks/useAuthentication');

    useAuthentication.mockReturnValue({
      authenticate: mockAuthenticate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AuthForm - Render', () => {
    it('should render without crashing', () => {
      renderWithProviders(<AuthForm variant="login" />);
    });

    it('login variant - should render username, password fields, button and link', () => {
      renderWithProviders(<AuthForm variant="login" />);

      const usernameField = screen.getByText('authForm.username');
      const passwordField = screen.getByText('authForm.password');
      const button = screen.getByText('authForm.buttons.login');
      const link = screen.getByText('authForm.dontHaveAccount');

      expect(usernameField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });

    it('register variant - should render username, password fields, button and link', () => {
      renderWithProviders(<AuthForm variant="register" />);

      const usernameField = screen.getByText('authForm.username');
      const passwordField = screen.getByText('authForm.password');
      const button = screen.getByText('authForm.buttons.register');
      const link = screen.getByText('authForm.alreadyHaveAccount');

      expect(usernameField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });

    it('register variant - should navigate to login page when link is clicked', () => {
      renderWithProviders(<AuthForm variant="register" />);

      const link = screen.getByText('authForm.alreadyHaveAccount');

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/login');
    });

    it('login variant - should navigate to register page when link is clicked', () => {
      renderWithProviders(<AuthForm variant="login" />);

      const link = screen.getByText('authForm.dontHaveAccount');

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/register');
    });
  });

  describe('AuthForm - Validation', () => {
    it('should show error messages for empty fields', async () => {
      renderWithProviders(<AuthForm variant="login" />);

      const button = screen.getByText('authForm.buttons.login');
      fireEvent.click(button);

      await waitFor(() => {
        const usernameError = screen.getByText('auth:authForm.validation.username.required');
        const passwordError = screen.getByText('auth:authForm.validation.password.required');

        expect(usernameError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
      });
    });

    it('should show error when username is too short', async () => {
      await testFieldValidation('AB', 'validpass123', 'auth:authForm.validation.username.min');
    });

    it('should show error when username is too long', async () => {
      await testFieldValidation(
        'verylongusername',
        'validpass123',
        'auth:authForm.validation.username.max'
      );
    });

    it('should show error when password is too short', async () => {
      await testFieldValidation('validuser', '12345', 'auth:authForm.validation.password.min');
    });

    it('should show error when password is too long', async () => {
      await testFieldValidation(
        'validuser',
        '1234567890123456',
        'auth:authForm.validation.password.max'
      );
    });
  });

  describe('AuthForm - Form submission', () => {
    it('should call authenticate with valid data on login', async () => {
      const {container} = renderWithProviders(<AuthForm variant="login" />);

      const usernameInput = container.querySelector('input[name="username"]') as HTMLInputElement;
      const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;

      fireEvent.change(usernameInput, {target: {value: 'testuser'}});
      fireEvent.change(passwordInput, {target: {value: 'testpass123'}});

      const button = screen.getByText('authForm.buttons.login');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockAuthenticate).toHaveBeenCalledTimes(1);
        expect(mockAuthenticate).toHaveBeenCalledWith(
          {username: 'testuser', password: 'testpass123'},
          'login'
        );
      });
    });

    it('should not call authenticate when validation fails', async () => {
      renderWithProviders(<AuthForm variant="login" />);

      const button = screen.getByText('authForm.buttons.login');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('auth:authForm.validation.username.required')).toBeInTheDocument();
        expect(screen.getByText('auth:authForm.validation.password.required')).toBeInTheDocument();
      });

      expect(mockAuthenticate).not.toHaveBeenCalled();
    });
  });
});

const testFieldValidation = async (username: string, password: string, expectedError: string) => {
  const {container} = renderWithProviders(<AuthForm variant="login" />);

  const usernameInput = container.querySelector('input[name="username"]') as HTMLInputElement;
  const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;

  fireEvent.change(usernameInput, {target: {value: username}});
  fireEvent.change(passwordInput, {target: {value: password}});

  const button = screen.getByText('authForm.buttons.login');
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(expectedError)).toBeInTheDocument();
  });
};
