using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnet_employee_management.Migrations
{
    /// <inheritdoc />
    public partial class updateRoleUserDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "USERS",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "USERS",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "USERS",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Admission",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsProfile",
                table: "Admission",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "USERS");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "USERS");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "USERS");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Admission");

            migrationBuilder.DropColumn(
                name: "IsProfile",
                table: "Admission");
        }
    }
}
