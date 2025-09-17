// "use client";

// import { motion } from "framer-motion";
// import DashboardHeader from "@/components/dashboard/DashboardHeader";
// import { Card } from "@/components/ui/card";

// const entries = [
//   {
//     id: "a1",
//     time: "2025-09-08 09:55",
//     actor: "User",
//     action: "Completed Registration & Uploaded Documents",
//     ref: "Onboarding",
//   },
//   {
//     id: "a2",
//     time: "2025-09-08 10:10",
//     actor: "User",
//     action: "Signed Master Platform Agreement (MPA)",
//     ref: "Legal",
//   },
//   {
//     id: "a3",
//     time: "2025-09-08 10:18",
//     actor: "System",
//     action: "Generated Shariah Digital Passport",
//     ref: "KYC",
//   },
//   {
//     id: "a4",
//     time: "2025-09-08 10:25",
//     actor: "User",
//     action: "Browsed Marketplace & Selected Vehicle",
//     ref: "Marketplace",
//   },
//   {
//     id: "a5",
//     time: "2025-09-08 10:32",
//     actor: "System",
//     action: "Created Preliminary Purchase Order (PO)",
//     ref: "Marketplace",
//   },
//   {
//     id: "a6",
//     time: "2025-09-08 10:40",
//     actor: "User",
//     action: "Accepted Murabahah Contract",
//     ref: "Contract",
//   },
//   {
//     id: "a7",
//     time: "2025-09-08 10:42",
//     actor: "System",
//     action: "Submitted for Scholar & Finance Review",
//     ref: "Approval",
//   },
//   {
//     id: "a8",
//     time: "2025-09-08 11:05",
//     actor: "Scholar",
//     action: "Approved Contract (POF Issued)",
//     ref: "Shariah Review",
//   },
//   {
//     id: "a9",
//     time: "2025-09-08 11:20",
//     actor: "Bank",
//     action: "Issued Offer Letter",
//     ref: "Finance Review",
//   },
//   {
//     id: "a10",
//     time: "2025-09-09 09:15",
//     actor: "User",
//     action: "Confirmed Vehicle Delivery Details",
//     ref: "Execution",
//   },
//   {
//     id: "a11",
//     time: "2025-09-09 15:30",
//     actor: "System",
//     action: "Recorded Ownership Transfer on Blockchain",
//     ref: "Delivery",
//   },
//   {
//     id: "a12",
//     time: "2025-09-10 08:00",
//     actor: "User",
//     action: "First Installment Paid via SATpay",
//     ref: "Payments",
//   },
// ];

// const AuditLog = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-maroon/10 via-background to-golden/10">
//       <DashboardHeader />
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <Card className="p-6 bg-card/70 backdrop-blur-sm border border-maroon/20 rounded-2xl shadow-lg">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex items-center space-x-3 mb-6"
//           >
//             <div className="h-6 w-6 rounded-lg border-2 border-maroon bg-maroon/10" />
//             <h1 className="text-2xl sm:text-3xl font-semibold text-maroon tracking-tight">
//               Audit Log
//             </h1>
//           </motion.div>

//           {/* Entries */}
//           <div className="divide-y divide-maroon/10">
//             {entries.map((e, i) => (
//               <motion.div
//                 key={e.id}
//                 initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.05 }}
//                 className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
//               >
//                 <div>
//                   <p className="text-maroon font-medium">{e.action}</p>
//                   <p className="text-xs sm:text-sm text-golden">
//                     {e.actor} • {e.ref}
//                   </p>
//                 </div>
//                 <span className="text-xs sm:text-sm text-golden font-medium">
//                   {e.time}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AuditLog;
