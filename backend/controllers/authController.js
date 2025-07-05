const authController = {
  // Demo login - stores session in HTTP-only cookie
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      // Demo authentication - in production, verify against database
      if (username === 'demo' && password === 'demo') {
        const user = {
          id: 1,
          username: 'demo',
          name: 'Demo User'
        };

        // Set HTTP-only cookie for session
        res.cookie('session', JSON.stringify(user), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({ 
          message: 'Login successful',
          user: { id: user.id, username: user.username, name: user.name }
        });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Failed to login' });
    }
  },

  // Logout - clear session cookie
  async logout(req, res) {
    try {
      res.clearCookie('session');
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error.message);
      res.status(500).json({ error: 'Failed to logout' });
    }
  },

  // Get current session
  async getSession(req, res) {
    try {
      const session = req.cookies.session;
      
      if (session) {
        const user = JSON.parse(session);
        res.json({ 
          isAuthenticated: true,
          user: { id: user.id, username: user.username, name: user.name }
        });
      } else {
        res.json({ isAuthenticated: false });
      }
    } catch (error) {
      console.error('Get session error:', error.message);
      res.json({ isAuthenticated: false });
    }
  },

  // Demo registration
  async register(req, res) {
    try {
      const { username, password, name } = req.body;
      
      if (!username || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Demo registration - in production, save to database
      const user = {
        id: Date.now(), // Demo ID
        username,
        name
      };

      res.json({ 
        message: 'Registration successful', 
        user: { id: user.id, username: user.username, name: user.name }
      });
    } catch (error) {
      console.error('Registration error:', error.message);
      res.status(500).json({ error: 'Failed to register' });
    }
  }
};

module.exports = authController;