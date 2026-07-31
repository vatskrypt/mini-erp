interface LoginInput {
    email: string;
    password: string;
}
declare class AuthService {
    login({ email, password }: LoginInput): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map