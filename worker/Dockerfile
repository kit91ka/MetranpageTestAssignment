FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . ./

RUN dotnet build -c Release -o out

WORKDIR /app/out

EXPOSE 8080
CMD ["dotnet", "worker.dll"]
