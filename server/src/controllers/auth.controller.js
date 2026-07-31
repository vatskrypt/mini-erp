import authService from "../services/auth.service.js";
class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "Email and password are required",
                });
                return;
            }
            const result = await authService.login({
                email, password,
            });
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new AuthController();
//# sourceMappingURL=auth.controller.js.map