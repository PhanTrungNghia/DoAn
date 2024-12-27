using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnet_employee_management.Migrations
{
    /// <inheritdoc />
    public partial class addProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsConfirm",
                table: "Admission",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsConfirm",
                table: "Admission");
        }
    }
}
