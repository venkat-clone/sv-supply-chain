    import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
    import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
    import { z } from "zod";

    const API_BASE_URL = "http://localhost:5000/api";

    const server = new McpServer({
      name: "generated-mcp-server",
      version: "1.0.0",
    });

    // 🧠 Zod Schemas for Models
    const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  roleId: z.number(),
  role: z.any(),
  orders: z.array(z.any()),
  vehicle: z.array(z.any()),
  rides: z.array(z.any()),
  address: z.string(),
  Location: z.array(z.any()),
  createdAt: z.string().datetime()
});

const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  users: z.array(z.any()),
  permissions: z.array(z.any()),
  createdAt: z.string().datetime()
});

const PermissionSchema = z.object({
  id: z.number(),
  action: z.string(),
  description: z.string(),
  roles: z.array(z.any()),
  createdAt: z.string().datetime()
});

const RolePermissionSchema = z.object({
  id: z.number(),
  role: z.any(),
  roleId: z.number(),
  permission: z.any(),
  permissionId: z.number()
});

const OrderSchema = z.object({
  id: z.number(),
  customer: z.any(),
  customerId: z.number(),
  driver: z.any(),
  driverId: z.number(),
  vehicle: z.any(),
  vehicleId: z.number(),
  fromLocation: z.any(),
  fromLocationId: z.number(),
  toLocation: z.any(),
  toLocationId: z.number(),
  loadTons: z.number(),
  status: z.any(),
  estimatedDistance: z.number(),
  traveledDistance: z.number(),
  extraDistance: z.number(),
  requestedAt: z.string().datetime(),
  deliveredAt: z.string().datetime(),
  charges: z.array(z.any()),
  totalCharge: z.number(),
  transactionStatus: z.any()
});

const LocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  pincode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  contact: z.any(),
  contactId: z.number(),
  sentOrders: z.array(z.any()),
  receivedOrders: z.array(z.any())
});

const ExtraChargeSchema = z.object({
  id: z.number(),
  order: z.any(),
  orderId: z.number(),
  title: z.string(),
  amount: z.number(),
  createdAt: z.string().datetime()
});

const VehicleSchema = z.object({
  id: z.number(),
  name: z.string(),
  number: z.string(),
  type: z.any(),
  typeId: z.number(),
  capacityTons: z.number(),
  owned: z.boolean(),
  isAvailable: z.boolean(),
  provider: z.string(),
  contact: z.string(),
  currentStatus: z.string(),
  createdAt: z.string().datetime(),
  orders: z.array(z.any()),
  drivers: z.array(z.any())
});

const VehicleTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  minLoadCapacity: z.number(),
  maxLoadCapacity: z.number(),
  minDistance: z.number(),
  maxDistance: z.number(),
  description: z.string(),
  vehicles: z.array(z.any())
});

    // 🚀 MCP Tools with API integration
            server.registerTool(
          "get_all_Users",
          {
            title: "Get all User",
            description: "Fetch all User entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/User?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_User_by_id",
          {
            title: "Get User by ID",
            description: "Fetch User by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/User/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_User",
          {
            title: "Create User",
            description: "Create a new User entry",
            inputSchema: UserSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/User`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_User",
          {
            title: "Update User",
            description: "Update an existing User entry",
            inputSchema: {UserSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/User/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_User",
          {
            title: "Delete User",
            description: "Delete User by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/User/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

        server.registerTool(
          "get_all_Roles",
          {
            title: "Get all Role",
            description: "Fetch all Role entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/Role?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_Role_by_id",
          {
            title: "Get Role by ID",
            description: "Fetch Role by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Role/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_Role",
          {
            title: "Create Role",
            description: "Create a new Role entry",
            inputSchema: RoleSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Role`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_Role",
          {
            title: "Update Role",
            description: "Update an existing Role entry",
            inputSchema: {RoleSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Role/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_Role",
          {
            title: "Delete Role",
            description: "Delete Role by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Role/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

        server.registerTool(
          "get_all_Permissions",
          {
            title: "Get all Permission",
            description: "Fetch all Permission entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/Permission?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_Permission_by_id",
          {
            title: "Get Permission by ID",
            description: "Fetch Permission by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Permission/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_Permission",
          {
            title: "Create Permission",
            description: "Create a new Permission entry",
            inputSchema: PermissionSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Permission`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_Permission",
          {
            title: "Update Permission",
            description: "Update an existing Permission entry",
            inputSchema: {PermissionSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Permission/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_Permission",
          {
            title: "Delete Permission",
            description: "Delete Permission by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Permission/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

        server.registerTool(
          "get_all_RolePermissions",
          {
            title: "Get all RolePermission",
            description: "Fetch all RolePermission entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/RolePermission?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_RolePermission_by_id",
          {
            title: "Get RolePermission by ID",
            description: "Fetch RolePermission by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/RolePermission/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_RolePermission",
          {
            title: "Create RolePermission",
            description: "Create a new RolePermission entry",
            inputSchema: RolePermissionSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/RolePermission`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_RolePermission",
          {
            title: "Update RolePermission",
            description: "Update an existing RolePermission entry",
            inputSchema: {RolePermissionSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/RolePermission/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_RolePermission",
          {
            title: "Delete RolePermission",
            description: "Delete RolePermission by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/RolePermission/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

        server.registerTool(
          "get_all_Orders",
          {
            title: "Get all Order",
            description: "Fetch all Order entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/Order?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_Order_by_id",
          {
            title: "Get Order by ID",
            description: "Fetch Order by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Order/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_Order",
          {
            title: "Create Order",
            description: "Create a new Order entry",
            inputSchema: OrderSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Order`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_Order",
          {
            title: "Update Order",
            description: "Update an existing Order entry",
            inputSchema: {OrderSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Order/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_Order",
          {
            title: "Delete Order",
            description: "Delete Order by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Order/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

        server.registerTool(
          "get_all_Locations",
          {
            title: "Get all Location",
            description: "Fetch all Location entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/Location?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_Location_by_id",
          {
            title: "Get Location by ID",
            description: "Fetch Location by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Location/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_Location",
          {
            title: "Create Location",
            description: "Create a new Location entry",
            inputSchema: LocationSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Location`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_Location",
          {
            title: "Update Location",
            description: "Update an existing Location entry",
            inputSchema: {LocationSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Location/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_Location",
          {
            title: "Delete Location",
            description: "Delete Location by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Location/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

        server.registerTool(
          "get_all_ExtraCharges",
          {
            title: "Get all ExtraCharge",
            description: "Fetch all ExtraCharge entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/ExtraCharge?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_ExtraCharge_by_id",
          {
            title: "Get ExtraCharge by ID",
            description: "Fetch ExtraCharge by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/ExtraCharge/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_ExtraCharge",
          {
            title: "Create ExtraCharge",
            description: "Create a new ExtraCharge entry",
            inputSchema: ExtraChargeSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/ExtraCharge`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_ExtraCharge",
          {
            title: "Update ExtraCharge",
            description: "Update an existing ExtraCharge entry",
            inputSchema: {ExtraChargeSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/ExtraCharge/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_ExtraCharge",
          {
            title: "Delete ExtraCharge",
            description: "Delete ExtraCharge by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/ExtraCharge/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

        server.registerTool(
          "get_all_Vehicles",
          {
            title: "Get all Vehicle",
            description: "Fetch all Vehicle entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/Vehicle?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_Vehicle_by_id",
          {
            title: "Get Vehicle by ID",
            description: "Fetch Vehicle by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Vehicle/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_Vehicle",
          {
            title: "Create Vehicle",
            description: "Create a new Vehicle entry",
            inputSchema: VehicleSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Vehicle`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_Vehicle",
          {
            title: "Update Vehicle",
            description: "Update an existing Vehicle entry",
            inputSchema: {VehicleSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/Vehicle/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_Vehicle",
          {
            title: "Delete Vehicle",
            description: "Delete Vehicle by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/Vehicle/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

        server.registerTool(
          "get_all_VehicleTypes",
          {
            title: "Get all VehicleType",
            description: "Fetch all VehicleType entries",
            inputSchema: {
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
},
          },
          async ({ page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" }) => {
            const query = new URLSearchParams({ page, limit, sortBy, sortOrder });
            const response = await fetch(`${API_BASE_URL}/VehicleType?${query}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "get_VehicleType_by_id",
          {
            title: "Get VehicleType by ID",
            description: "Fetch VehicleType by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/VehicleType/${id}`);
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "create_VehicleType",
          {
            title: "Create VehicleType",
            description: "Create a new VehicleType entry",
            inputSchema: VehicleTypeSchema.omit({ id: true }).shape,
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/VehicleType`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "update_VehicleType",
          {
            title: "Update VehicleType",
            description: "Update an existing VehicleType entry",
            inputSchema: {VehicleTypeSchema},
          },
          async (input) => {
            const response = await fetch(`${API_BASE_URL}/VehicleType/${input.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            const data = await response.json();
            return { content: [{ type: "json", json: data }] };
          }
        );

        server.registerTool(
          "delete_VehicleType",
          {
            title: "Delete VehicleType",
            description: "Delete VehicleType by ID",
            inputSchema: { id: z.number() },
          },
          async ({ id }) => {
            const response = await fetch(`${API_BASE_URL}/VehicleType/${id}`, {
              method: "DELETE",
            });
            const result = await response.json();
            return { content: [{ type: "json", json: result }] };
          }
        );

    async function main() {
      const transport = new StdioServerTransport();
      await server.connect(transport);
      console.error("Generated MCP Server started");
    }

    main().catch((err) => {
      console.error("Failed to start MCP server:", err);
      process.exit(1);
    });