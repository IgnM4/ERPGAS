export default function Docs() {
  return (
    <div className="space-y-2 text-sm">
      <h2 className="text-xl font-bold mb-4">API Docs</h2>
      <p>Endpoints disponibles:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><code>POST /api/auth/assign-role</code> — cuerpo: {'{ uid, role }'} — requiere rol ADMIN.</li>
        <li><code>GET /api/auth/profile</code> — retorna perfil del usuario autenticado.</li>
        <li><code>POST /api/auth/revoke</code> — cuerpo: {'{ uid }'} — revoca sesiones de un usuario (ADMIN).</li>
      </ul>
    </div>
  );
}
